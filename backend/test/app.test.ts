import request from "supertest"
import { app } from "../app"

describe("get /validate", () => {
  describe("when req.query.value is empty", () => {
    test("return success", () => {
      return request(app)
        .get("/validate?type=email&value=undefined")
        .send({ type: "email", value: undefined })
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.text).toEqual(JSON.stringify({ result: "success" }))
        })
    })
  })

  describe("when req.query.type is other than email address or username", () => {
    test("return success", () => {
      return request(app)
        .get("/validate?type=fullName&value=test")
        .then((response) => {
          expect(response.status).toEqual(200)
          expect(response.text).toEqual(JSON.stringify({ result: "success" }))
        })
    })
  })

  // describe("when req.query.type is email", () => {
  //   describe("when it was already registered", () => {
  //     test("return success", () => {
  //       return request(app)
  //         .get("/validate?type=email&value=test")
  //         .send({ type: "email", value: "test" })
  //         .then((response) => {
  //           expect(response.status).toEqual(200)
  //           expect(response.text).toEqual(
  //             JSON.stringify({
  //               result: "failure",
  //               message: "既に登録されています",
  //             })
  //           )
  //         })
  //     })
  //   })
  // })
})
