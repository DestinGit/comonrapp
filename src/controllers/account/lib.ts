import { Request, Response } from 'express';
import { UserModel } from '../../schema/user';
// import passwordHash from 'password-hash';
import passwordHash = require ('password-hash');

class UserLib {
    constructor() {}

    async signup(request: Request, response: Response) {
        const { password, email } = request.body;
        
        if (!email || !password) {
            return response.status(400).json({
                text: "Invalid request"
            });
        }

        const user = {
            email,
            password: passwordHash.generate(password)
        };

        try {
            const findUser = await UserModel.findOne({
                email
            });

            if (findUser) {
                return response.status(400).json({
                    text: "User already exists"
                });
            }
        } catch (err) {
            return response.status(500).json({err})
        }

        try {
            
            const userDoc = new UserModel(user);
            const userObject = await userDoc.save();

            return response.status(200).json({
                text: "success",
                token: userObject.getToken()
            })
        } catch (err) {
            return response.status(500).json({ err });
        }
    }


    async login(req: Request, res: Response) {
        
        // const { password, email } = req.query;
        const { password, email } = req.body;
        if (!email || !password) {
          //Le cas où l'email ou bien le password ne serait pas soumit ou nul
          return res.status(400).json({
            text: "Requête invalide"
          });
        }
        try {
          // On check si l'utilisateur existe en base
          const findUser = await UserModel.findOne({ email });
          if (!findUser)
            return res.status(401).json({
              text: "L'utilisateur n'existe pas"
            });
          if (!findUser.authenticate(password))
            return res.status(401).json({
              text: "Mot de passe incorrect"
            });
          return res.status(200).json({
            token: findUser.getToken(),
            text: "Authentification réussi"
          });
        } catch (error) {
          return res.status(500).json({
            error
          });
        }
      }
}

export default new UserLib();