const fastify = require('fastify')({
    logger: true
  });
  
  // Load banned words (this should be a large list of words you want to check)
  const bannedWords = [
    "anal", "anus", "arse", "ass", "ballsack", "balls", "bastard", "bitch", "biatch", "bloody",
    "blowjob", "blow job", "bollock", "bollok", "boner", "boob", "bugger", "bum", "butt", "buttplug",
    "clitoris", "cock", "coon", "crap", "cunt", "damn", "dick", "dildo", "dyke", "fag", "feck", "fellate",
    "fellatio", "felching", "fuck", "f u c k", "fudgepacker", "fudge packer", "flange", "Goddamn", "God damn",
    "hell", "homo", "jerk", "jizz", "knobend", "knob end", "labia", "lmao", "lmfao", "muff", "nigger", "nigga",
    "omg", "penis", "piss", "poop", "prick", "pube", "pussy", "queer", "scrotum", "sex", "shit", "s hit", "sh1t",
    "slut", "smegma", "spunk", "tit", "tosser", "turd", "twat", "vagina", "wank", "whore", "wtf"
  ];
  
  // Register CORS plugin to allow cross-origin requests
  fastify.register(require('@fastify/cors'), {
    origin: '*', // Allow all origins (you can restrict this if necessary)
    methods: ['GET', 'POST'] // Allow GET and POST requests
  });
  
  // POST route to check for swear words
  fastify.post("/", async (request, reply) => {
    const { message } = request.body;
  
    if (!message) {
      return reply.status(400).send({ error: "No message provided" });
    }
  
    // Convert the message to lowercase and check for swear words
    const detectedWords = bannedWords.filter((word) =>
      message.toLowerCase().includes(word.toLowerCase())
    );
  
    // Return detected swear words, or null if none are found
    reply.send({ detectedWords: detectedWords.length > 0 ? detectedWords : null });
  });
  
  fastify.get("/", (request, reply) => {
      reply.send("bad word detector").status(200)
  })
  
  // Run the server on port 3000 or process.env.PORT if set
  fastify.listen(
    { port: process.env.PORT || 3000, host: "0.0.0.0" },
    (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server is running at ${address}`);
    }
  );
  