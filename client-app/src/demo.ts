let data = 42;
data = data + 3;

export interface Duck {
    name: string,
    numLegs: number,
    makeSound: (sound: string) => void;
}

const duck1: Duck = {
    name: 'huey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

const duck2: Duck = {
    name: 'dewey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

duck1.makeSound('quack');
duck1.name = 'xx';

export const ducks = [duck1,duck2];