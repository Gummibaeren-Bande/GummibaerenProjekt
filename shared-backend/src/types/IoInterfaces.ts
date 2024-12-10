// remaining socketIO interfaces for ts support. can be turned into extensible types if ever needed

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
