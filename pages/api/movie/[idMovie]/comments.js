import { dbService } from "../../../../services/db"
import { bodyValidatorService } from "../../../../services/bodyValidator"
 
/**
* @swagger
* /api/movie/{idMovie}/comments:
*   get:
*     summary: Get all comments
*     description: Returns comments for a specific movie
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ID of the movie to retrieve comments for
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successfully retrieved comments for the movie
*       404:
*         description: Movie with the specified ID not found
*   post:
*     summary: Create comment
*     description: Add a new comment to a movie
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ID of the movie to add the comment to
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       201:
*         description: Comment added successfully
*       400:
*         description: Bad request, please provide valid comment data
*/

/**
* @swagger
* components:
*   schemas:
*     Comment:
*       type: object
*       properties:
*         text:
*           type: string
*           description: The text of the comment
*         note:
*           type: string
*           description: The note of the Comment
*         movie_id:
*           type: string
*           description: The movie ID of the Comment
*       required:
*         - text
*         - note
*         - movie_id
*/
export default async function handler(req, res) {
    const { idMovie } = req.query

    switch (req.method) {
        case "GET":
            res.json({ status: 200, data: await dbService.findCommentsByMovieId(idMovie) });
            break;

        case "POST":
            if (req.body && bodyValidatorService.isValidComment(req.body)) {
                res.status(201).json({ status: 201, data: await dbService.insertOneComment("comments", req.body) });
            } else {
                res.status(400).json({status: 400, error: "Wrong Body"});
            }
            break;
    }
}