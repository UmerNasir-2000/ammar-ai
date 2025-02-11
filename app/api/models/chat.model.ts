import mongoose, { Schema, Document } from 'mongoose';

interface IChat extends Document {
  data: Record<string, any>;
}

const ChatSchema: Schema = new Schema(
  {
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
