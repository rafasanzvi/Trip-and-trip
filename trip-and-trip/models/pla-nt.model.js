const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
    {
        sName: {
            type: String,
            required: true
        },

        cName: {
            type: String,
            required: true
        },

        region: {
            type: [String],
            enum: ["Africa", "America", "Europe", "Asia", "Oceania"],
            required: true
        },

        cultures: {
            type: [String]
        },

        //area:

        files: {
            type: [String]
        },

        types: {
            type: [String],
            enum: ["Psychedelic", "Medicinal", "Toxic"],
            required: true
        },

        description: {
            type: String
        },

    }
)

const Plant = model("Plant", plantSchema)
module.exports = Plant 