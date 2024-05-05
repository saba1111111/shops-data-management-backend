'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      surname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('worker', 'customer'),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('active', 'inactive', 'unverified', 'banned'),
      },
      information: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
