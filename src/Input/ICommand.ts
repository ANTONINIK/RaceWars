export type ICommand = {
  execute(gameObject: IGameObject, event?: MouseEvent): void
}
