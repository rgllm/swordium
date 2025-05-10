import { UploadDropzone } from 'react-uploader';
import { Uploader } from 'uploader'

const uploader = Uploader({ apiKey: 'free' })
const options = {
  maxFileCount: 1,
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  editor: { images: { crop: false } },
  styles: { colors: { primary: '#000' }, border: '0' },
}

type ImageUploadProps = {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  return (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={files => {
        const url = files[0]?.fileUrl
        if (url) onChange(url)
      }}
      width="500px"
      height="320px"
    />
  )
}