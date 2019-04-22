const Message = require('../models/messageModel');

module.exports = {
    createMessage: createMessage,
    getMessageById: getMessageById,
    getMessages: getMessages
};

function createMessage(req, res) {
    if (validateEmail(req.body.email) && (req.body.text.trim().length > 0 && req.body.text.length < 1000)) {
        let message = new Message(req.body);
        message.save((err) => {
            if (err) return res.send({success: false, message: "Error saving message"});
            return res.send({success: true, message: "Message saved", data: message});
        })
    } else return res.send({success: false, message: "Email is not real or no message"});
}

function getMessageById(req, res) {
    if (!!req.swagger.params.id.value) {
        Message.findById(req.swagger.params.id.value)
            .exec((err, message) => {
                if (err) return res.send({success: false, message: "Error finding message"});
                return res.send({success: true, data: message});
            })
    }
}

function getMessages(req, res) {
    if (!!req.swagger.params.part.value && Number(req.swagger.params.part.value) >= 0) {
        Message.find()
            .sort({createdAt: 1})
            .skip(Number(req.swagger.params.part.value) * 10)
            .limit(10)
            .exec((err, messages) => {
                if (err) return res.send({success: false, message: "Error finding messages"});
                return res.send({success: true, data: messages});
            })
    }
}

function validateEmail(email) {
    var test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return test.test(String(email).toLowerCase());
}