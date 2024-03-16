import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const HeartModal = ({ isOpen, handleClose }: Props) => {
  function onCloseClick() {
    return handleClose()
  }

  return (
    <BaseModal
      title="Send me some ❤️ !"
      isOpen={isOpen}
      handleClose={onCloseClick}
    >
      <p className="text-sm text-gray-500 dark:text-gray-300">
        If you had fun and want to encourage me, you can buy my book. It's a
        great way to support me and keep me motivated to create more games like
        this one.
      </p>

      <p className="mt-2">
        <a href="https://a.co/d/8Tut4mF">
          <img
            src="https://m.media-amazon.com/images/I/71-+ldu704L._SY522_.jpg"
            alt="Book cover"
            className="mx-auto w-1/2"
          />
        </a>
      </p>
    </BaseModal>
  )
}
