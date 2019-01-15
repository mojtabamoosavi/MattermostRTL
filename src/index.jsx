import React from 'react'
import { isRTL } from './rtl'
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
        // Get all post message
        let postsText = document.getElementsByClassName('post-message__text');
        for (let postText of postsText) {
            // Get element
            const element = postText;
            // Get element inner text
            const text = element.innerText;
            // Check direction
            const dir = isRTL(text) ? 'rtl' : 'ltr';
            // Set direction
            element.setAttribute("dir", dir);
        }
    }

    makeRTL() {
        // Get post textarea
        const postBox = document.getElementById('post_textbox');
        // Textarea keyup event
        postBox.addEventListener('keyup', function(){
            // Get textarea value
            let postBoxValue = postBox.value;
            // Check direction
            if(isRTL(postBoxValue)) {
                postBox.setAttribute("dir", "rtl");
            } else {
                postBox.setAttribute("dir", "ltr");
            }
        });
    }

    makeReplyRTL() {
        // Get reply textarea
        const replyBox = document.getElementById('reply_textbox');
        // Check if reply box exist
        if(replyBox) {
            // Textarea keyup event
            replyBox.addEventListener('keyup', function(){
                // Get textarea value
                let replyBoxValue = replyBox.value;
                // Check direction
                if(isRTL(replyBoxValue)) {
                    replyBox.setAttribute("dir", "rtl");
                } else {
                    replyBox.setAttribute("dir", "ltr");
                }
            });
        }
    }
}

window.registerPlugin('com.mojtabamoosavi.mattermost-rtl', new MattermostRTLPlugin());
