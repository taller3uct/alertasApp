import { NgModule } from '@angular/core';
import { MostrarFechaPipe } from './mostrar-fecha/mostrar-fecha';
import { TipoAlertaPipe } from './tipo-alerta/tipo-alerta';
@NgModule({
	declarations: [MostrarFechaPipe,
    TipoAlertaPipe],
	imports: [],
	exports: [MostrarFechaPipe,
    TipoAlertaPipe]
})
export class PipesModule {}
