export class PlanificadorDto {
  private constructor(
    public readonly id: string,
  ) {}

  static create(props: Record<string, any>): PlanificadorDto {
    const { _id } = props;
    return new PlanificadorDto(_id);
  }
}