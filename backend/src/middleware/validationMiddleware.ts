import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'

// Modified! Source: https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j
export function validate(schema: {
  body?: z.ZodObject<any, any>
  query?: z.ZodObject<any, any>
  params?: z.ZodObject<any, any>
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        schema.body.parse(req.body)
      }
      if (schema.query) {
        schema.query.parse(req.query)
      }
      if (schema.params) {
        schema.params.parse(req.params)
      }
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid data', details: errorMessages })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' })
      }
    }
  }
}
