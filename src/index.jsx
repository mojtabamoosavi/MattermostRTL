import React from 'react'
import {isRTL} from './rtl'
import './app.css';

class MattermostRTLPlugin {

    initialize(registry, store) {
        setTimeout(() => {
            this.makeRTL();
        }, 3000);

        setInterval(() => {
            this.fixAllMessages();
            this.makeReplyRTL();
        }, 1000)
    }

    fixAllMessages() {
        let postsText = document.getElementsByClassName('post-message__text');

        for (let postText of postsText) {
            const element = postText;
            const text = element.innerText;
            const dir = isRTL(text) ? 'rtl' : 'ltr';
            element.setAttribute("dir", dir);
            element.style.textAlign = isRTL(text) ? 'right' : 'left';
        }
    }

    makeElementRTL(element) {
        element && element.addEventListener('keyup', function () {
            let value = element.value;
            if (isRTL(value)) {
                element.setAttribute("dir", "rtl");
                element.style.textAlign = 'right';
            } else {
                element.setAttribute("dir", "ltr");
                element.style.textAlign = 'left';
            }
        });
    }

    makeRTL() {
        const postBox = document.getElementById('post_textbox');
        this.makeElementRTL(postBox);
    }

    makeReplyRTL() {
        const replyBox = document.getElementById('reply_textbox');
        this.makeElementRTL(replyBox);
    }
}

window.registerPlugin('com.mojtabamoosavi.mattermost-rtl', new MattermostRTLPlugin());
