const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');


class Task extends Model {}


Task.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Please enter a name" },
                notNull:  { msg: "Please enter a value" },
                len: {
                    args: [0, 50],
                    msg: "Name must be at most 50 characters"
                },
            },

    },
        completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }

}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true
});



module.exports =  Task;