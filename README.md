# DocCare

Welcome to our private healthcare platform, where we prioritize your well-being and provide seamless access to quality medical care.

## Features

Our website offers a comprehensive suite of features that enable patients to effortlessly schedule appointments and engage in virtual consultations with doctors. With our user-friendly interface, patients can conveniently manage their appointments, receive prescriptions, and access detailed medical notes.

We understand the importance of effective communication, which is why our platform also incorporates a live messaging feature. This allows patients to have real-time conversations with doctors, ensuring prompt and personalized medical advice whenever it's needed.

![alt text](/client/public/homepage.png)
![alt text](/client/public/homepage2.png)

## Installation

- Run `npm install` on both the Server folder and Client folder.

## Usage

To ensure smooth operation and security of our platform, we have specific configuration details that need to be set up. Please follow the instructions below:

- Set the desired port for our platform by including the following line in your `.env` file located in the Server folder:

```bash
PORT=3001
```

- For MySQL database integration, provide the appropriate credentials in your `.env` file:

```bash
MYSQL_USERNAME=example
MYSQL_PASSWORD=example
```

- To ensure secure authentication, include the following line in your `.env` file:

```bash
SECRET_KEY=example
```

By incorporating these configurations, we optimize the performance and security of our private healthcare platform, providing a reliable and efficient user experience.

## Starting MySQL

If MySQL is not running, you will need to start it before running the application. Follow the steps below to start MySQL using the terminal:

- Open a new terminal window.
- Run the command `mysql.server start`.

This will start the MySQL server, allowing the application to connect to the database seamlessly.

## Cloudinary

We utilise Cloudinary, a cloud-based image and video management, to enhance our platform's multimedia capabilities.

To get started, you will need to create a Cloudinary account by visiting their website.

Once you have your account set up, follow the instructions outlined in the documentation provided at https://cloudinary.com/documentation/how_to_integrate_cloudinary to obtain the necessary information.

Make sure to include the following details in your .env file located in your Client folder:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=example
CLOUDINARY_URL=cloudinary://example:example@example
CLOUDINARY_PRESET=example
CLOUDINARY_API_KEY=example
CLOUDINARY_API_SECRET=example
```

## Database scripts

To set up the database scripts, please follow these steps:

- Navigate to the Server folder.
- Inside the Server folder, run `cd seeds` and go to the 'seeds' directory.
- Run `node index.js` to execute the scripts and populate the database.

By running these scripts, you will ensure that the necessary data is seeded in the database, enabling the smooth operation of our private healthcare platform.

## Getting started

Run `npm start` from the Client folder.
Run `nodemon index.ts` from the Server folder.

## Contributors

- [Mylena Vendramini](https://github.com/mylenavendramini)
- [Harold Sadca](https://github.com/Harold-Sadca)
- [Ateja Janciukaite](https://github.com/Atejan07)
