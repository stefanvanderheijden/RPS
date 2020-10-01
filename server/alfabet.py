alfabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

word = "iruwpfpxuudb"

woordarray = list(word)
nieuwwoord = ''

print(woordarray)

for schuiven in range(-10,10):
    nieuwwoord = ''
    for letter in woordarray:
        for alfaletter in alfabet:
            if letter == alfaletter:
                index = alfabet.index(letter)
                newindex = index+schuiven
                if newindex > 25:
                    newerindex = newindex % 26
                    newindex = 1
                nieuwwoord = nieuwwoord + alfabet[newindex]
    print(nieuwwoord)



