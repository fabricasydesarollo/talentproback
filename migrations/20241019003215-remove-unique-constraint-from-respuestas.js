'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Elimina la restricción única
        await queryInterface.removeConstraint('respuestas', 'respuestas_idEvaluador_idColaborador_unique');
    },

    down: async (queryInterface, Sequelize) => {
        // Vuelve a agregar la restricción única si es necesario
        await queryInterface.addConstraint('respuestas', {
            fields: ['idEvaluador', 'idColaborador'],
            type: 'unique',
            name: 'respuestas_idEvaluador_idColaborador_unique'
        });
    }
};