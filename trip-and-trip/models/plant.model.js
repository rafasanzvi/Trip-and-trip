const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
    {
        sname: String,

        cname: {
            type: String,
        },

        region: {
            type: [String],
            enum: ["Africa", "America", "Europe", "Asia", "Oceania"]
        },

        cultures: {
            type: [String]
        },

        //area:

        file: {
            type: [String]
        },

        type: {
            type: [String],
            enum: ["Psychedelic", "Medicinal", "Toxic"]
        },

        description: String,

    }
)

const Plant = model("Plant", plantSchema)
module.exports = Plant 