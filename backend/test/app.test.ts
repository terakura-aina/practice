import request from "supertest"
import { app } from "../app"
import { prisma } from "../client"

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

  describe("when req.query.type is email", () => {
    beforeAll(async () => {
      await prisma.user.deleteMany()
      await prisma.user.create({
        data: {
          email: "test@test.com",
          fullName: "fullName",
          userName: "userName",
          password: "password",
        },
      })
    })
    describe("when it was already registered", () => {
      test("return success", async () => {
        return request(app)
          .get("/validate?type=email&value=test@test.com")
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.text).toEqual(
              JSON.stringify({
                result: "failure",
                message: "既に登録されています",
              })
            )
          })
      })
    })

    describe("when it was not already registered", () => {
      test("return success", async () => {
        return request(app)
          .get("/validate?type=email&value=not_registered@test.com")
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.text).toEqual(
              JSON.stringify({
                result: "success",
              })
            )
          })
      })
    })
  })

  describe("when req.query.type is userName", () => {
    beforeAll(async () => {
      await prisma.user.deleteMany()
      await prisma.user.create({
        data: {
          email: "test@test.com",
          fullName: "fullName",
          userName: "userName",
          password: "password",
        },
      })
    })
    describe("when it was already registered", () => {
      test("return success", async () => {
        return await request(app)
          .get("/validate?type=userName&value=userName")
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.text).toEqual(
              JSON.stringify({
                result: "failure",
                message: "既に登録されています",
              })
            )
          })
      })
    })

    describe("when it was not already registered", () => {
      test("return success", async () => {
        return await request(app)
          .get("/validate?type=userName&value=otherUserName")
          .then((response) => {
            expect(response.status).toEqual(200)
            expect(response.text).toEqual(
              JSON.stringify({
                result: "success",
              })
            )
          })
      })
    })
  })
})
