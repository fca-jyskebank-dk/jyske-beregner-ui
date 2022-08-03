import { CommonModule } from '@angular/common';
import { KirbyModule } from '@kirbydesign/designsystem';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '@shared/components/components.module';
import { JyskeKurslisteComponent } from './containers/jyske-kursliste/jyske-kursliste.component';
import { NgModule } from '@angular/core';
import { JyskeKurslisteStateModule } from './+state/jyske-kursliste.state.module';
import { JyskeKurslisteTabelComponent } from './presentational/jyske-kursliste-tabel/jyske-kursliste-tabel.component';
import { FkaModalComponent } from './presentational/fka-modal/fka-modal.component';
import { JyskeKurslisteMapper } from './+state/jyske-kursliste.map.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        KirbyModule,
        JyskeKurslisteStateModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
    ],
    declarations: [
        JyskeKurslisteComponent,
        JyskeKurslisteTabelComponent,
        FkaModalComponent,
    ],
    providers: [JyskeKurslisteMapper],
    exports: [JyskeKurslisteComponent]
})
export class JyskeKurslisteUiModule {}
