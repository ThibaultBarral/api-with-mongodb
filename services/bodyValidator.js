import { Comment } from "../model/comment"

export const bodyValidatorService = {
    
    isValidMovie: (body) => {
        try {
            if(
                body.name != null &&
                body.description != null &&
                body.date != null &&
                body.note != null
            ) {
                new Movie(
                    body.name,
                    body.description,
                    body.date,
                    body.note
                )
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    },

    isValidComment: (body) => {
        try {
            if(
                body.text != null &&
                body.note != null &&
                body.movie_id != null
            ) {
                new Comment(
                    body.text,
                    body.note,
                    body.movie_id
                )
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    }
}