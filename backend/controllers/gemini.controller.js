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
        text: `Is this a Pokémon? Return JSON in this format:{"name": "string","isValidPokemon": true/false,"rarity": "Common | Rare | Legendary | Mythical",
       "type": ["Type1", "Type2"....]}`,
      },
      {
        inlineData: {
          mimeType: "image/jpeg", // Or whichever format your image is
          data: pokemonPic.replace(/^data:image\/\w+;base64,/, ""),
        },
      },
    ]);

    //extract useful info from response 
    const poketext = geminiresponse.response.candidates[0].content.parts[0].text;
    const cleanedText = poketext.replace(/```json|```/g, "").trim();
    const pokemonInfo = JSON.parse(cleanedText);

    if (pokemonInfo.isValidPokemon) {
       //store the image in cloudinary
       const uploadRes = await cloudinary.uploader.upload(pokemonPic);
       //store the pokemon in database
       user.identifiedPokemon.push({ name: pokemonInfo.name,  imageUrl: uploadRes.secure_url });
       await user.save();
    }

    res.json({ success: true, data: pokemonInfo });

  } catch (error) {
    res.json({ success: false, message: error.message });
    console.error("Error in findPokemon:", error);
  }
};
