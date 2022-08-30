import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisneyCharactersService } from '../services/disney-characters.service';

@Component({
  selector: 'app-view-character',
  templateUrl: './view-character.component.html',
  styleUrls: ['./view-character.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCharacterComponent implements OnInit {

  id: any;
  character: any;
  constructor(
    private route: ActivatedRoute,
    private disneyCharactersService: DisneyCharactersService,
    private cdRef: ChangeDetectorRef,
  ) { }

  loading = true;

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    
    this.readData();

  }

  readData() {
    this.disneyCharactersService.getCharacter(this.id)
    
    .subscribe((response: any) => {

      this.character = response;
      console.log(this.character);

      this.loading = false;
      this.cdRef.markForCheck();
    });
  }

}
