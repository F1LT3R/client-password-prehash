# Client-Password-Prehash

## An experiment in pre-hashing the users password in the client.

TL,DR; [Try the Demo](https://f1lt3r.github.com/client-password-prehash)

This is an experiment that aims to make passwords harder for hackers to crack.

Passwords that are sent in plain-text are very vulnerable to attack, obviously. While passwords that are sent over TLS, are less vulnerable, but still able to be read as plain-text using a MITM attack.

Once the password is stored on the server, it should be salted (hashed with a key), so that that the password residing on the server is not in plain-text should a hacker gain access to the data.

However, if any of the users happen to use a easily crackable password, such as: "Password1234!", and you have used the same salt for all the users; then the hacker knows all the passwords for all your users. The same is true if the hacker gains the salt table.

Additionally, (and this was the purpose of me creating this experiment), if someone gains access to the original password, Eg: "Password1234!", then they likely have a password to other services that the user has credentials for. Such as: their email, bank account, social-media accounts, etc.

It is this network-effect of knowing a password that I was particularly interested in overcoming.

The big idea here is to create a hash of the password before it ever gets to the server, and adding domain-specific complexity to the hash that would make the cracking the password orders of magnitude harder, and by prohibiting the re-use of cracked passwords. (Once the hashed password is on the server, it can be secured the usual ways, salted, etc.)

Each service that provides a login screen, could customize the login process with a salt that is based on the user input. In this demo I have chosen to use image-keys to provide a further salt to the hashed password.

**Outline of the method:**

- Make sure the origin password has enough character length and complexity
- Use 4,321 rounds of SHA-512, to make the password-hash
- Randomize the key order and "hex-words" for each key, based on the seed of the password-hash
- Let the user pick any 3 or more key images (remembering order)
- Create a "sentence" of hex-words from the keys
- Use the sentence as a salt, to re-hash the password, using another 4,321 rounds of SHA-512 (this creates the output-hash)
- The output-hash is then used as the password that gets sent over TLS to the server
- The server then salts the output-hash, instead of a password
- Now that all this work has been done on the front-end, the cracker would have to use a program that created tables of passwords, and use 4,321 rounds of SHA-512 hashes to figure out the seed, then re-hash the password with `n` key combinations as the salt with another 4,321 rounds of SHA-512. And assuming the randomizer is cryptographically built, I would think method should take a lot longer to crack.

After the seed is guessed: you still have, 21 ^ 21 combinations of salts to guess, and hash again. Is this a trivial feat for an attacker, I am not qualified to understand.

## Shortcomings of This Method

My hope that was that because the salt would be domain-specific, and randomized by the user, that the attacker would not be able to use the password on other domains and services.

However: once the password is cracked, it would still be usable on domains without domain-specific and user-specific salting.

My first question is: whether the user and domain specific input would increase the cracking difficulty with enough orders of magnitude, to make the domain and user less vulnerable to attack.

Is it any better than just upping the rounds?

My second question is: would this make things too hard for the user (remembering the order of 3+ images)

Perhaps allowing users to value simplicity above security is a flawed paradigm.

Whatever the case: because the hashes in transit are both domain and user specific, I would think that finding solutions to hashes with platforms like MD5-Online or MD5 Decrypt would become much harder, especially where multiple services used similar (and slightly different) techniques.

- Alistair