import User from "../models/users.model.js";
import { geminiVisionModel } from "../utils/gemini.js";
import cloudinary from "../utils/cloudinary.js";

export const findPokemon = async (req, res) => {
  try {
    const userID = res.locals.userId;
    const { pokemonPic } = req.body;

    if (!pokemonPic) {
      res.json({ success: false, message: "No image provided" });
    }

    const user = await User.findById(userID);

    if (!user) {
      res.json({ success: false, message: "User not found" });
    }



    //logic to detect pokemon using gemini vision API

    const geminiresponse = await geminiVisionModel.generateContent([
      {
        text: `Is this a Pokémon? Return JSON in this format:{"name": "string","isValidPokemon": true/false,"rarity": "common | rare | legendary | mythical",
       "type": ["Type1", "Type2"....], info(one paragraph about pokemon): "string" , fourMainAttacks : [A1 , A2 , A3 , A4]}`,
      },
      {
        inlineData: {
          mimeType: "image/jpeg", // Or whichever format your image is
          data: pokemonPic.replace(/^data:image\/\w+;base64,/, ""),
        },
      },
    ]);

    //extract useful info from response
    const poketext =
      geminiresponse.response.candidates[0].content.parts[0].text;
    const cleanedText = poketext.replace(/```json|```/g, "").trim();
    const pokemonInfo = JSON.parse(cleanedText);

    if (pokemonInfo.isValidPokemon) {
        
       console.log(`This is user's stamina : ${user.stamina}`) 
       //use this part to manupulate the stamina for the game.


        //check if pokemon is already identified by the user already
      const alreadyIdentified = user.identifiedPokemon.find(
        (poke) => poke.name.toLowerCase() === pokemonInfo.name.toLowerCase()
      );

      if (alreadyIdentified) {
        return res.json({
          success: false,
          message: "Pokémon already identified!",
        });
      }


      //store the image in cloudinary
      const uploadRes = await cloudinary.uploader.upload(pokemonPic);
      //store the pokemon in database
      const tempObj = {
        name: pokemonInfo.name,
        imageUrl: uploadRes.secure_url,
        rarity: pokemonInfo.rarity,
        type: pokemonInfo.type,
        attacks: pokemonInfo.fourMainAttacks,
        description: pokemonInfo.info,
      };

      user.identifiedPokemon.push(tempObj);
      await user.save();
    }

    res.json({ success: true, data: pokemonInfo });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.error("Error in findPokemon:", error);
  }
};
