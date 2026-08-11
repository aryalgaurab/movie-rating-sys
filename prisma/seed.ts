import { PrismaClient, Role } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in environment variables for seeding.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.review.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "System Admin",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: "user1@user.com",
      name: "Hari Bahadur",
      password: hashedPassword,
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@user.com",
      name: "Ramesh Bahadur",
      password: hashedPassword,
      role: Role.USER,
    },
  });

  const movie1 = await prisma.movie.create({
    data: {
      title: "Inception",
      description: `Dom Cobb is a skilled thief who specializes in "extraction," the art of stealing secrets from deep within a person's subconscious while they dream. Haunted by his past and separated from his children, Cobb is offered a chance at redemption through "inception": the seemingly impossible task of planting an idea into a target's mind rather than stealing one. Leading a team of specialists into a multi-layered dream state, Cobb must navigate dangerous subconscious defenses and his own traumatic memories of his late wife to succeed. If they pull off the perfect crime, he can return home; if they fail, they risk being trapped in limbo forever`,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHkblibrLHCFmxp_QZnOv32TP75tsEadtmxxZBZTtfxw&s=10",
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: "Interstellar",
      description:
        "In a near-future Earth ravaged by crop blight and dust storms, humanity faces extinction. Cooper, a former NASA pilot turned farmer, is recruited for a desperate mission to save the human race. He must pilot a spacecraft through a newly discovered wormhole near Saturn to find a habitable planet in another galaxy. Leaving his children behind, Cooper and a team of scientists travel across space and time, facing the relativistic effects of black holes and the harsh realities of alien worlds. The story explores the lengths a father will go to for his family and the survival of humanity, blending hard science with an emotional journey across the stars.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0q8X1cJVdSnL_EEfSfv0KNg7u2WzYkW1AsMEFNQTqlw&s=10",
    },
  });

  const movie3 = await prisma.movie.create({
    data: {
      title: "The Matrix",
      description: `Thomas Anderson is a computer programmer living a double life as a hacker known as "Neo." Plagued by questions about the nature of reality, he is contacted by the mysterious Morpheus and the warrior Trinity. They reveal a shocking truth: the world Neo knows is actually the Matrix, a simulated reality created by sentient machines to distract humans while their bodies are used as an energy source. Offered a choice between the comfort of ignorance (the blue pill) and the painful truth (the red pill), Neo chooses the latter. He joins a rebellion of free humans, discovering he may be "The One" prophesied to end the war and free humanity from machine control.`,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXReXa1uog5bZ4PJ8RtVv_iYLANNAudvgKVbDP94Iw_g&s=10",
    },
  });

  const movie4 = await prisma.movie.create({
    data: {
      title: "Blade Runner 2049",
      description: `Thirty years after the original events, Officer K is a "blade runner," a bio-engineered replicant who hunts down and retires rogue older models. While investigating a routine case, K unearths a long-buried secret: a replicant died during childbirth, proving that replicants can reproduce biologically. This discovery threatens to destabilize society and spark a war between humans and replicants. Ordered to destroy the evidence, K instead goes rogue to find the child and the missing former blade runner, Rick Deckard. His journey forces him to question his own identity and what it truly means to be human in a world where the line is increasingly blurred.`,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9nFKzJXkLkTPkJOsJLSfN-z87ukGlfpIbzWQU8g4coA&s=10",
    },
  });

  const movie5 = await prisma.movie.create({
    data: {
      title: "Spirited Away",
      description: `Chihiro, a sullen ten-year-old girl, is moving to a new home when her family takes a wrong turn into a mysterious tunnel. They discover an abandoned amusement park that transforms into a spirit world at night. After her parents greedily eat food meant for spirits and are turned into pigs, Chihiro is trapped. To survive and save her parents, she must work in a massive bathhouse run by the witch Yubaba, who steals her name and renames her "Sen." With the help of a mysterious boy named Haku, Chihiro navigates a world of gods, witches, and strange spirits, learning courage and self-reliance to break the spell and return to the human world.`,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6ugAMFuMfwg4zknYY5mTG87xcBjfQiZ9t-OvfL0AD3g&s=10",
    },
  });

  const movie6 = await prisma.movie.create({
    data: {
      title: "Kabaddi",
      description: `Kabaddi is a high-energy contact team sport originating from South Asia, played between two teams of seven players on opposite halves of a court. The game revolves around "raids," where an offensive player (the raider) enters the opposing team's half to tag as many defenders as possible and return safely to their own side. The unique rule is that the raider must continuously chant "kabaddi, kabaddi" without taking a breath during the entire raid, which must be completed within 30 seconds. Points are scored for every opponent tagged, while defenders earn a point if they successfully tackle and stop the raider. It is a test of speed, strength, strategy, and breath control.`,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Wg1ANHRvmuI1UpLasGNRcmRd-2XG3tMfNEXCF5PFBQ&s=10",
    },
  });

  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: "Very good movie",
        userId: user1.id,
        movieId: movie1.id,
      },
      {
        rating: 1,
        comment: "Yesta nathe movie",
        userId: user2.id,
        movieId: movie2.id,
      },
      {
        rating: 2,
        comment: "k ho k bujhnai sakiyena",
        userId: user1.id,
        movieId: movie2.id,
      },
      {
        rating: 3,
        comment: "Typical dayahang rai movie",
        userId: user1.id,
        movieId: movie6.id,
      },
      {
        rating: 4,
        comment: "Thikai cha",
        userId: user2.id,
        movieId: movie6.id,
      },
      {
        rating: 2,
        comment: "not so interesting",
        userId: user1.id,
        movieId: movie5.id,
      },
      {
        rating: 3,
        comment: "Okish movie",
        userId: user1.id,
        movieId: movie4.id,
      },
    ],
  });

  console.log("Database successfully seeded!");
  console.log(`Admin ID: ${admin.email} Password: password`);
  console.log(`User ID: ${user1.email} ${user2.email} Password: password`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
