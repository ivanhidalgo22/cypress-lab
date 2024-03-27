///<reference path="types.ts" />

import express from "express";

import {
  getBankAccountsByUserId,
  getBankAccountById,
  createBankAccountForUser,
  removeBankAccountById,
} from "./database";
import { checkAuth0Jwt, ensureAuthenticated, validateMiddleware } from "./helpers";
import { shortIdValidation, isBankAccountValidator } from "./validators";
const router = express.Router();

// Routes

//GET /bankAccounts (scoped-user)
router.get("/", checkAuth0Jwt, (req, res) => {
  /* istanbul ignore next */
  const accounts = getBankAccountsByUserId(req.user?.id!);

  res.status(200);
  res.json({ results: accounts });
});

//GET /bankAccounts/:bankAccountId (scoped-user)
router.get(
  "/:bankAccountId",
  checkAuth0Jwt,
  validateMiddleware([shortIdValidation("bankAccountId")]),
  (req, res) => {
    const { bankAccountId } = req.params;

    const account = getBankAccountById(bankAccountId);

    res.status(200);
    res.json({ account });
  }
);

//POST /bankAccounts (scoped-user)
router.post(
  "/",
  checkAuth0Jwt,
  validateMiddleware(isBankAccountValidator),
  (req, res) => {
  /* istanbul ignore next */
  const account = createBankAccountForUser(req.user?.id!, req.body);

  res.status(200);
  res.json({ account });
});

//DELETE (soft) /bankAccounts (scoped-user)
router.delete(
  "/:bankAccountId",
  checkAuth0Jwt,
  validateMiddleware([shortIdValidation("bankAccountId")]),
  (req, res) => {
    const { bankAccountId } = req.params;

    const account = removeBankAccountById(bankAccountId);

    res.status(200);
    res.json({ account });
  }
);

export default router;
