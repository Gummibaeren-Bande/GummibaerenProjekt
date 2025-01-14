import TeacherSocketsManager from "../entities/TeacherSocketsManager";
import IoSocket from "../types/IoSocket";

describe("TeacherSocketsManager", () => {
  let teacherSocketsManager: TeacherSocketsManager;
  let mockSocket: IoSocket;

  beforeEach(() => {
    // Create a fresh instance before each test
    teacherSocketsManager = new TeacherSocketsManager();

    // Create a mock socket
    mockSocket = {
      id: "test-socket-id",
      // Add other required IoSocket properties here
    } as IoSocket;
  });

  describe("constructor", () => {
    it("should initialize with an empty sockets array", () => {
      const manager = new TeacherSocketsManager();
      // Using type assertion to access private property for testing
      expect((manager as any).sockets).toEqual([]);
    });
  });

  describe("addSocket", () => {
    it("should add a socket to the sockets array", () => {
      teacherSocketsManager.addSocket(mockSocket);
      // Using type assertion to access private property for testing
      expect((teacherSocketsManager as any).sockets).toHaveLength(1);
      expect((teacherSocketsManager as any).sockets[0]).toBe(mockSocket);
    });

    it("should allow adding multiple sockets", () => {
      const mockSocket2 = { id: "test-socket-id-2" } as IoSocket;

      teacherSocketsManager.addSocket(mockSocket);
      teacherSocketsManager.addSocket(mockSocket2);

      // Using type assertion to access private property for testing
      expect((teacherSocketsManager as any).sockets).toHaveLength(2);
      expect((teacherSocketsManager as any).sockets).toContain(mockSocket);
      expect((teacherSocketsManager as any).sockets).toContain(mockSocket2);
    });
  });

  describe("removeSocket", () => {
    beforeEach(() => {
      // Add a socket before each test in this describe block
      teacherSocketsManager.addSocket(mockSocket);
    });

    it("should remove a socket from the sockets array", () => {
      teacherSocketsManager.removeSocket(mockSocket);
      // Using type assertion to access private property for testing
      expect((teacherSocketsManager as any).sockets).toHaveLength(0);
    });

    it("should only remove the specified socket", () => {
      const mockSocket2 = { id: "test-socket-id-2" } as IoSocket;
      teacherSocketsManager.addSocket(mockSocket2);

      teacherSocketsManager.removeSocket(mockSocket);

      // Using type assertion to access private property for testing
      expect((teacherSocketsManager as any).sockets).toHaveLength(1);
      expect((teacherSocketsManager as any).sockets[0]).toBe(mockSocket2);
    });

    it("should do nothing if the socket is not found", () => {
      const nonExistentSocket = { id: "non-existent-id" } as IoSocket;

      teacherSocketsManager.removeSocket(nonExistentSocket);

      // Using type assertion to access private property for testing
      expect((teacherSocketsManager as any).sockets).toHaveLength(1);
      expect((teacherSocketsManager as any).sockets[0]).toBe(mockSocket);
    });
  });
});
