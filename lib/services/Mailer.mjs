/**
 * Mailer class
 *
 * @file Mailer.mjs
 * @author SachchidanandY
*/

import sendgrid from 'sendgrid';
import { SENDGRID_KEY } from '../config'

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super(props);

        this.sgApi = sendgrid(SENDGRID_KEY);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = recipients.map(email => (new helper.Email(email)));

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });

        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

export default Mailer;
