const router = require('express').Router({ mergeParams: true });
const tokenHandler = require('../handlers/tokenHandler');
const sectionController = require('../controllers/section');
const validation = require('../handlers/validation');
const { param } = require('express-validator');

router.post(
  '/',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid section ID');
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.create
);

router.put(
  '/:sectionId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board ID');
    } else {
      return Promise.resolve();
    }
  }),
  param('sectionId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid section ID');
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.update
);

router.delete(
  '/:sectionId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board ID');
    } else {
      return Promise.resolve();
    }
  }),
  param('sectionId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid section ID');
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.delete
);

module.exports = router;
