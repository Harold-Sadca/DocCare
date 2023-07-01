'use server'

import { v2 as cloudinary } from 'cloudinary'

export async function getSignature () {
  const timestamp = Math.round(new Date().getTime() / 1000)

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'next' },
  )

  return { timestamp, signature }
}

export async function saveToDatabase (data) {
  console.log(data)

  // verify the data
  // const expectedSignature = cloudinary.utils.api_sign_request(
  //   { public_id, version },
  //   cloudinaryConfig.api_secret
  // )

  // console.log({ public_id })

  // if (expectedSignature === signature) {
  //   // safe to write to database
  //   console.log({ public_id })
  // }
}

// export async function saveToDatabase ({ public_id, version, signature }) {
//   // verify the data
//   const expectedSignature = cloudinary.utils.api_sign_request(
//     { public_id, version },
//     cloudinaryConfig.api_secret
//   )

//   console.log({ public_id })

//   if (expectedSignature === signature) {
//     // safe to write to database
//     console.log({ public_id })
//   }
// }