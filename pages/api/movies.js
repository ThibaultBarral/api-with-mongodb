import { dbService } from "../../services/db"
import { bodyValidatorService } from "../../services/bodyValidator" 

/**
* @swagger
* /api/movies:
*   get:
*     summary: Get all movies
*     description: Returns movies
*     responses:
*       200:
*         description: Success
*   post:
*     summary: Create a movie
*     description: Add a new movie
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Movie' 
*     responses:
*       201:
*         description: Movie added successfully
*       400:
*         description: Bad request, please provide valid movie data
*/
export default async function handler(req, res) {

    switch (req.method) {
        case "GET":
            res.json({ status: 200, data: await dbService.findAll("movies") });
            break;

        case "POST":
            if (req.body && bodyValidatorService.isValidMovie(req.body)) {
                res.status(201).json({ status: 201, data: await dbService.insertOneMovie("movies", req.body) });
            } else {
                res.status(400).json({status: 400, error: "Wrong Body"});
            }
            break;
    }
}