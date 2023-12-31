import Conversation from "../models/Conversation.js"
//new conv

export const createNewConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  })

  try {
    const savedConversation = await newConversation.save()
    res.status(200).json(savedConversation)
  } catch (err) {
    res.status(500).json(err)
  }
}

//get conv of a user

export const getConversationOfaUser = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err)
  }
}

// get conv includes two userId

export const getConversationOfTwoUser = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: {
        $all: [req.params.firstUserId, req.params.secondUserId],
      },
    })

    if (!conversation) {
      return res.status(201).json({
        success: false,
        message: "NO conversation found",
      })
    }
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err)
  }
}
