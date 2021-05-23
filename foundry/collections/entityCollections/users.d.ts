/**
 * The collection of User entities which is accessible through `game.users`.
 * The array of User entities within this collection is accessible through `game.users.entities`.
 */
declare class Users extends EntityCollection<User> {
  static permissions: typeof CONST.USER_PERMISSIONS;

  /** @override */
  static socketListeners(socket: SocketIOClient.Socket): void;

  /**
   * Handle receipt of activity data from another User connected to the Game session
   * @param userId - The User id who generated the activity data
   * @param activityData - The object of activity data
   */
  protected static _handleUserActivity(userId: string, activityData: User.ActivityData): void;

  /**
   * The User entity of the currently connected user
   */
  current: User | null;

  /** @override */
  get entity(): string;

  /**
   * Get the users with player roles
   * @returns
   */
  get players(): User[];

  /**
   * Initialize the Map object and all its contained entities
   */
  protected _initialize(data: User.Data[]): void;
}
