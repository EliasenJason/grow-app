module.exports = {
  reactStrictMode: true,
  env: {
    CLOUDINARY_UPLOAD_URL: process.env.CLOUDINARY_UPLOAD_URL
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}
