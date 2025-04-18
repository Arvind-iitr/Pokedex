import jtw from 'jsonwebtoken';

export const userAuthenticate = async(req, res, next) => {
   try {
      const token = req.cookies.token;
      if (!token) {
         return res.status(401).json({ message: 'You are not authenticated' });
      }

      const decodedToken = jtw.verify(token, process.env.SECRET);

      if(decodedToken.id)
      {
        req.body.userID = decodedToken.id; //sending user id in the body
      }
      else{
        return res.status(401).json({ message: 'Invalid token' });
      }

      next();

   } catch (error) {
       
     return res.status(401).json({ message: error.message });
   }

}