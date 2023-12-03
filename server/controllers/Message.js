import Message from "../models/Message.js"

//add

export const addNewMessage = async (req, res) => {
  const newMessage = new Message(req.body)

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
