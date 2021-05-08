export type NotificationProps = {
    message: string | null
  }
  
  const Notification = ({ message }: NotificationProps) => {
    if (message === null) return null

    return (
    <div className="notification-message">
        {message}
    </div>)
  }

  export default Notification