"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("requests", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      rule: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      billions: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      rangeInit: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      rangeEnd: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      html: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      respondedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("requests");
  },
};
