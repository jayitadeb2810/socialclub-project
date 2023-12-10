import Message from "../models/Message.js"

//add

export const addNewMessage = async (req, res) => {
  console.log(req)
  const newMessage = new Message(req.body.message)

  try {
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//get

export const getConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.deleteOne({
      _id: req.params.messageId,
    })

    res.status(200).json({
      success: true,
      message: "Message deleted",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
