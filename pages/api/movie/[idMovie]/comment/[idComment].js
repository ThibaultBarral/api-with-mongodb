import { dbService } from "../../../../../services/db"
import { bodyValidatorService } from "../../../../../services/bodyValidator"

/**
* @swagger
* /api/movie/{idMovie}/comment/{idComment}:
*   get:
*     summary: Get a comment by ID
*     description: Retrieve a single comment by its ID
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ID of the movie to retrieve
*         schema:
*           type: string
*       - in: path
*         name: idComment
*         required: true
*         description: ID of the comment to retrieve
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successful operation. Returns the requested comment.
*       404:
*         description: Comment not found. The specified ID does not exist.
*   delete:
*     summary: Delete a comment by ID
*     description: Delete a single comment by its ID
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ID of the movie to delete
*         schema:
*           type: string
*       - in: path
*         name: idComment
*         required: true
*         description: ID of the comment to delete
*         schema:
*           type: string
*     responses:
*       204:
*         description: Comment deleted successfully.
*       404:
*         description: Comment not found. The specified ID does not exist.
*   put:
*     summary: Update a comment by ID
*     description: Update a single comment by its ID
*     parameters:
*       - in: path
*         name: idMovie
*         required: true
*         description: ID of the movie to update
*         schema:
*           type: string
*       - in: path
*         name: idComment
*         required: true
*         description: ID of the comment to update
*         schema:
*           type: string
*     requestBody:
*       description: Updated comment data
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       200:
*         description: Comment updated successfully. Returns the updated comment.
*       400:
*         description: Bad request. Invalid request body.
*       404:
*         description: Comment not found. The specified ID does not exist.
*/
export default async function handler(req, res) {
    const { idComment } = req.query

    switch (req.method) {
        case "GET":
            res.status(200).json({ status: 200, data: {comment: await dbService.findOne("comments", idComment)} });
            break;

        case "DELETE":
            await dbService.deleteOne("comments", idComment);
            res.status(204).json({ status: 204 });
            break;
        case "PUT":
            if (req.body && bodyValidatorService.isValidComment(req.body)) {
                res.status(200).json({ status: 200, data: await dbService.updateOne("comments", idComment, req.body) });
            } else {
                res.status(400).json({status: 400, error: "Wrong Body"});
            }
    }
}