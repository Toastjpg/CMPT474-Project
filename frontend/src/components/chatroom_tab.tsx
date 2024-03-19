
import { Comment } from './comment';

export function ChatroomTab() {
    return (
        <section id="chatroomTab">
            {Array(15)
                .fill(0)
                .map(() => (
                    <Comment />
          ))}
        </section>
    )
}