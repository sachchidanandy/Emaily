/**
 * Servety template
 *
 * @file serveyTemplate.mjs
 * @author SachchidanandY
*/

import { HOST_NAME } from '../config';

export default content => (`
    <html>
        <body>
            <div style="text-align: center;">
                <h3>I'd like your input!</h3>
                <p>Please answer the following question:</p>
                <p>${content}</p>
                <div>
                    <a href="${HOST_NAME}/servey/thanks">Yes</a>
                    <a href="${HOST_NAME}/servey/thanks">No</a>
                </div>
            </div>
        </body>
    </html>
`)
