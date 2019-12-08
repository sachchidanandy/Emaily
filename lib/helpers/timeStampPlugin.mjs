/**
 *  Plugin to track when document is inserted and updated
 *
 *  @file time_stamp_plugin.js
 *  @author SachchidanandY
 *
*/

export default function timeStamp(schema) {
    // Add createdAt and updatedAt key into schema
    schema.add({
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date}
    });

    // Add a pre-save hook
    schema.pre('save', function(next){
        const currentTime = Date.now();

        // Set updatedAt time
        this.updatedAt = currentTime;

        // Set created at only if it's null
        if (!this.createdAt) {
            this.createdAt = currentTime;
        }

        // Call the next function
        next();
    });
}
