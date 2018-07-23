import { EcommerceModule } from './products.module';

describe('ProductsModule', () => {
  let productsModule: EcommerceModule;

  beforeEach(() => {
    productsModule = new EcommerceModule();
  });

  it('should create an instance', () => {
    expect(productsModule).toBeTruthy();
  });
});
