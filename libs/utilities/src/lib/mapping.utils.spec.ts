import { mapper } from "./mapping.utils";

interface Source {
  name: string;
  age: number;
}

interface Target {
  name: string;
  age: number;
  // Extra property
  address: string;
}

interface CustomSource {
  firstName: string;
  lastName: string;
  age: number;
}

interface CustomTarget {
  givenName: string;
  familyName: string;
  age: number;
  // Extra property
  address: string;
}

describe('Mapping utilities', () => {
  describe('When mapper has been called', () => {
    it('Should map all equal properties automatically from the source to the target', () => {
      const source: Source = { name: 'John', age: 30 };
      const result = mapper<Source, Target>(source)
      expect(result).toStrictEqual({ age: 30, name: 'John' });
    });

    it('Should map all properties in property map parameter from the source to the target', () => {
      const source: CustomSource = { firstName: 'John', lastName: 'Snow', age: 30 };
      const result = mapper<CustomSource, CustomTarget>(source, { firstName: "givenName"})
      expect(result).toStrictEqual({ age: 30, givenName: 'John' });
    });
  });
});
