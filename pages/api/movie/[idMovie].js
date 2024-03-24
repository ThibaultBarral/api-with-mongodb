import { dbService } from "../../../services/db"
import { bodyValidatorService } from "../../../services/bodyValidator"

/**
* @swagger
* /api/movie/{idMovie}:
*   get:
*     summary: Get a movie by ID
*     description: Get a movie by ID
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ID of the movie to retrieve
*         schema:
*           type: string
*     responses:
*       200:
*         description: Movie retrieved successfully
*       404:
*         description: Movie not found
*   delete:
*     summary: Delete a movie by ID
*     description: Delete a movie by ID
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ID of the movie to delete
*         schema:
*           type: string
*     responses:
*       204:
*         description: Movie deleted successfully
*       404:
*         description: Movie not found
*   put:
*     summary: Update a movie by ID
*     description: Update a movie by ID
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ID of the movie to update
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Movie'
*     responses:
*       200:
*         description: Movie updated successfully
*       400:
*         description: Bad request, please provide valid movie data
*       404:
*         description: Movie not found
*/

/**
* @swagger
* components:
*   schemas:
*     Movie:
*       type: object
*       properties:
*         name:
*           type: string
*           description: The text of the Movie
*         description:
*           type: string
*           description: The description of the Movie
*         date:
*           type: string
*           description: The date of the Movie
*         note:
*           type: string
*           description: The note of the Movie
*       required:
*         - name
*         - description
*         - date
*         - note
*/
export default async function handler(req, res) {
    const { idMovie } = req.query

    switch (req.method) {
        case "GET":
            res.status(200).json({ status: 200, data: {movie: await dbService.findOne("movies", idMovie)} });
            break;

        case "DELETE":
            await dbService.deleteOne("movies", idMovie);
            res.status(204).json({ status: 204 });
            break;
        case "PUT":
            if (req.body && bodyValidatorService.isValidMovie(req.body)) {
                res.status(200).json({ status: 200, data: await dbService.updateOne("movies", idMovie, req.body) });
            } else {
                res.status(400).json({status: 400, error: "Wrong Body"});
            }
    }
}