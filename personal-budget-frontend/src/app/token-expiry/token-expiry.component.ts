import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-token-expiry',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './token-expiry.component.html',
  styleUrl: './token-expiry.component.scss'
})
export class TokenExpiryComponent {
  constructor(public dialogRef: MatDialogRef<TokenExpiryComponent>) {}

  onRefresh(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
