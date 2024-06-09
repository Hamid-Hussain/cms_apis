"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Blogs", "body", {
      type: Sequelize.TEXT,
      allowNull: true, // adjust according to your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Blogs", "body", {
      type: Sequelize.STRING,
      allowNull: true, // adjust according to your requirements
    });
  },
};
